# #dictionaries
# dict={'a':1,'b':2,'c':3}
# print(dict)


d2=dict(name='aman',age=20)
print(d2)

d3={}
d3['name']='aman'
d3['age']=20
print(d3)

print(d3['name'])
print(d3.keys())
print(d3.values())
print(d3.items()) 
d3.update({'balance':0,'surname':'sharma'})
print(d3)
d3.delete('balance')
print(d3)

