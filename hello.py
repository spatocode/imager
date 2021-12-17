import sys
from PIL import Image
import os
from subprocess import call
import shutil


file_path = sys.argv[1]
folder_path = file_path.split(os.path.basename(file_path))[0]
desktop_path = file_path.split('/')[:3]
desktop_path = '/'.join(desktop_path)+'/Desktop/'

air_directory = os.path.join(desktop_path, 'AIR Low-Res Sets/')

ds_store = os.path.join(folder_path, '.DS_Store')


try:
	os.mkdir(air_directory)
except:
	print('AIR folder already exists')

print(folder_path)

try:
	if os.path.exists(ds_store):
		os.system("rm -r {}/.DS_Store".format(folder_path))
except:
	print('Deleted DS store')


img = Image.open(file_path)
basewidth = 800

wpercent = (basewidth / float(img.size[0]))
hsize = int((float(img.size[1]) * float(wpercent)))
img = img.resize((basewidth, hsize), Image.ANTIALIAS)
img.save(os.path.join(air_directory, os.path.basename(file_path)))
print('Complete...!')


