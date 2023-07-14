markdown_py -x tables -x attr_list -x md_in_html -x def_list -x smarty resume.md > output.html
cat head.txt output.html tail.txt > ../resume.html
echo "DONE"
