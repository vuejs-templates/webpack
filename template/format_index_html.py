import sys
import fileinput

file = 'templates/index.html'

with open(file, "r+") as f:
    s = f.read()
    f.seek(0)
    f.write("{% load staticfiles %}\n" + s)

for i, line in enumerate(fileinput.input(file, inplace=1)):
    sys.stdout.write(line.replace('href=//', "href={% static '"))
for i, line in enumerate(fileinput.input(file, inplace=1)):
    sys.stdout.write(line.replace('css', "css' %}"))
for i, line in enumerate(fileinput.input(file, inplace=1)):
    sys.stdout.write(line.replace('src=//', "src={% static '"))
for i, line in enumerate(fileinput.input(file, inplace=1)):
    sys.stdout.write(line.replace('js', "js' %}"))
