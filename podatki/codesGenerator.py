f = open("podatki/result.txt", "a+", encoding="utf-8")
f.write("{")
for i in range(26, 34):
    f.write(
        "graph%s:{\nid:1 ,\ntitle:'',\nvalues:[],\ndecodedValues:[],\nkeys:[],\ncollection:accidentsCollection,\nattribute:'',\nregex:false},\n" % i)
