# #list
# l=[]
# l.append(1)
# l.append(2)
# l.append(3)
# print(l)


# #indexing
# print(l[0])
# print(l[1])
# print(l[2])

#
# l=['aashish',18,'kv',500]
# print(f'''
# name:{l[0]}
# age:{l[1]}
# school:{l[2]}
# marks:{l[3]}
#  ''')


#
# s='raman bhari 24 punjab university, chandigarh 500'
# print(s.split())

# l=['raman bhari',24,'punjab university, chandigarh',500]
# print(l[0],l[1],l[2],l[3
# for i in range(4):
#     print(l[i], end='')
    
# n=int(input('enter how makny times you want to append:'))
# l=[]

# for i in range(n):
#     a=int(input('enter a no to append:'))
#     l.append(a)
# sum=0

# for i in range(n):
#     sum=sum+l[i]
# print("total is",sum)


#
n=int(input('enter no of items you want to put in list:'))
l=[]
for i in range(n):
    a=int(input('enter a no:'))
    l.append(a)
print(l)
#print only odd nos
for i in range(n):
    if l[i]%2==1:
        print(l[i])

#




    