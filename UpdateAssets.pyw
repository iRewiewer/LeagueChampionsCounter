from requests import get
from json import loads
from tarfile import open as opentar
from distutils.dir_util import copy_tree
from shutil import rmtree
from os import path, remove, listdir, rename, mkdir

# Get latest version #
versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json"
latest = loads(get(versionUrl).content)[0]
print(f"Found latest patch {latest}.")

# Download archive #
url = f"https://ddragon.leagueoflegends.com/cdn/dragontail-{latest}.tgz"
print(f"Downloading datadragon patch {latest}.tgz...")
if path.isfile(f"./archives/{latest}.tgz"):
    remove(f"./archives/{latest}.tgz")
if not path.isdir(f"archives"):
    mkdir("archives")
open(f"./archives/{latest}.tgz", "wb").write(get(url, allow_redirects = True).content)

# Extract archive #
print(f"Extracting...")
file = opentar(f"./archives/{latest}.tgz")
file.extractall(f'./extracted/tmp')
file.close()

# Remove unnecessary folders #
print(f"Removing unnecessary folders...")
if path.isdir(f"./extracted/{latest}"):
    rmtree(f"./extracted/{latest}")
copy_tree(f"./extracted/tmp/{latest}/img/champion", f"./extracted/{latest}")
rmtree(f"./extracted/tmp")

# Rename champions #
print(f"Renaming champions...")
root = f"./extracted/{latest}"
exceptions = {
    "AurelionSol" : "Aurelion Sol",
    "Belveth" : "Bel\'veth",
    "Chogath" : "Cho\'gath", 
    "DrMundo" : "Dr. Mundo",
    "JarvanIV" : "Jarvan IV",
    "Kaisa" : "Kai\'sa",
    "Khazix" : "Kha\'Zix",
    "KogMaw" : "Kog\'Maw",
    "KSante" : "K\'Sante",
    "LeeSin" : "Lee Sin",
    "MasterYi" : "Master Yi",
    "MissFortune" : "Miss Fortune",
    "RekSai" : "Rek\'Sai",
    "TahmKench" : "Tahm Kench",
    "TwistedFate" : "Twisted Fate", 
    "Velkoz" : 'Vel\'koz',
    "MonkeyKing" : "Wukong",
    "XinZhao" : "Xin Zhao"
}

for badName in exceptions.keys():
    rename(f"{root}/{badName}.png", f"{root}/{exceptions[badName]}.png")

# Updating champs JS #
rmtree("./assets/champs")
defChamps = "let champs = [''"
copy_tree(f"./extracted/{latest}", f"./assets/champs/")
print("Updating champs JS...")

for champ in listdir("./assets/champs"):
    champ = champ[:-4] # remove .png
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
    defChamps += f", '{champ}'"

defChamps += "]"

file = open("./defineChamps.js", "w")
file.write(defChamps)

print("Operation successful.")