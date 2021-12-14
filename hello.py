import sys
from PIL import Image
import os
from subprocess import call
import shutil


folder_path = sys.argv[1]
folder_name = folder_path.split('/')[-1:]
folder_name = folder_name[0]
desktop_path = folder_path.split('/')[:3]
desktop_path = '/'.join(desktop_path)+'/Desktop/'




air_directory = os.path.join(desktop_path, 'AIR Low-Res Sets/')


try:
	os.mkdir(air_directory)
except:
	print('AIR folder already exists')

print(folder_path)

try:
	os.system("rm -r {}/.DS_Store".format(folder_path))
except:
	print('Deleted DS store')

file_names = os.listdir(folder_path)


try:
	file_names.remove('.DS_Store')
except:
	print('DS Store removed')

low_res_directory = os.path.join(air_directory, folder_name)



try:
	os.mkdir(low_res_directory)
except:
	print('Low Res folder already exists')
	try:
		shutil.rmtree(low_res_directory)
		os.mkdir(low_res_directory)
	except:
		print('Deleted and re-added folder')

for i in range(len(file_names)):
	file_path = '{}/'.format(folder_path)+file_names[i]
	img = Image.open(file_path)
	basewidth = 800

	wpercent = (basewidth / float(img.size[0]))
	hsize = int((float(img.size[1]) * float(wpercent)))
	img = img.resize((basewidth, hsize), Image.ANTIALIAS)
	img.save('{}/{}'.format(low_res_directory,file_names[i]))
print('Complete...!')


