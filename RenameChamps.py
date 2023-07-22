from os import rename

def RenameChamps(latest):
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