from requests import get
from json import loads
from tarfile import open as opentar
from distutils.dir_util import copy_tree
from shutil import rmtree
from RenameChamps import RenameChamps
from os import path, remove, listdir

# Get latest version
versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json"
latest = loads(get(versionUrl).content)[0]
print(f"Found latest patch {latest}.")

# Download archive
url = f"https://ddragon.leagueoflegends.com/cdn/dragontail-{latest}.tgz"
print(f"Downloading datadragon patch {latest}.tgz...")
if path.isfile(f"./archives/{latest}.tgz"):
    remove(f"./archives/{latest}.tgz")
open(f"./archives/{latest}.tgz", "wb").write(get(url, allow_redirects = True).content)

# Extract archive
print(f"Extracting...")
file = opentar(f"./archives/{latest}.tgz")
file.extractall(f'./extracted/tmp')
file.close()

# Remove unnecessary folders
print(f"Removing unnecessary folders...")
if path.isdir(f"./extracted/{latest}"):
    rmtree(f"./extracted/{latest}")
copy_tree(f"./extracted/tmp/{latest}/img/champion", f"./extracted/{latest}")
rmtree(f"./extracted/tmp")

# Rename champions
print(f"Renaming champions...")
RenameChamps(latest)

# Updating champs JS
rmtree("./assets/champs")
defChamps = "let champs = [''"
copy_tree(f"./extracted/{latest}", f"./assets/champs/")
print("Updating champs JS...")

for champ in listdir("./assets/champs"):
    champ = champ[:-4]
    match champ:
        case "Bel'veth":
            champ = "Bel\\'veth"
        case "Cho'gath":
            champ = "Cho\\'gath"
        case "Kai'sa":
            champ = "Kai\\'sa"
        case "Kha'Zix":
            champ = "Kha\\'Zix"
        case "Kog'Maw":
            champ = "Kog\\'Maw"
        case "K'Sante":
            champ = "K\\'Sante"
        case "Rek'Sai":
            champ = "Rek\\'Sai"
        case "Vel'koz":
            champ = "Vel\\'koz"
    defChamps += f", '{champ}'" # remove .png

defChamps += "]"

file = open("./defineChamps.js", "w")
file.write(defChamps)

print("Operation successful.")