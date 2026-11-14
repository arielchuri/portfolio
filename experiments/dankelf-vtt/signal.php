<?php
// Ephemeral WebRTC Signaling Mailbox for Dark Elf VTT (Zero-Database Shared Hosting)
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

$room = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['room'] ?? 'default');
$peer = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['peer'] ?? '');
$file = sys_get_temp_dir() . '/dankelf_sig_' . ($room ?: 'default') . '.json';

$fp = fopen($file, 'c+');
if (!$fp || !flock($fp, LOCK_EX)) {
  echo json_encode(['ok' => false, 'messages' => []]);
  exit;
}

$raw = stream_get_contents($fp);
$messages = $raw ? (json_decode($raw, true) ?: []) : [];
$now = microtime(true);
// Prune signals older than 60 seconds
$messages = array_values(array_filter($messages, fn($m) => ($now - ($m['ts'] ?? 0)) < 60));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = json_decode(file_get_contents('php://input'), true);
  if (is_array($body) && isset($body['sender'])) {
    $body['ts'] = $now;
    $messages[] = $body;
  }
}

ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($messages));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

$since = isset($_GET['since']) ? (float)$_GET['since'] : 0;
$out = array_values(array_filter($messages, fn($m) =>
  ($m['ts'] > $since) &&
  ($m['sender'] !== $peer) &&
  (empty($m['target']) || $m['target'] === $peer)
));

echo json_encode(['ok' => true, 'now' => $now, 'messages' => $out]);
