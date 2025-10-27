# #creating a set 
# set1={1,2,3,4,5}
# set2={3,4,5,6,7}
# print(set1.union(set2))
# print(set1.intersection(set2))
# print(set1.difference(set2))
# print(set1.symmetric_difference(set2))



# set1.remove(3)
# print(set1)
# #removes a particular element

# set1.discard(3)
# print(set1)

# set1.pop()
# print(set1)
# #rmeoves and return a random element

# set1.clear()
# print(set1)
# #removes all elements


# #2309---------------------------------------------


# #disjoint
# set1={1,2,3,4,5}
# set2={6,7,8,9,10}
# print(set1.isdisjoint(set2))

# #subset
# set1={1,2,3,4,5}
# set2={1,2,3}
# print(set1.issubset(set2))

# #superset
# set1={1,2,3,4,5}
# set2={1,2,3}
# print(set1.issuperset(set2))
# print(set2.issuperset(set1))

# #symmetric difference
# set1={1,2,3,4,5}
# set2={3,4,5,6,7}
# print(set1^set2)

# #copy
# set1={1,2,3,4,5}
# set2=set1.copy()
# print(set2)

# set6=set()
# for i in range (10):
#     set6.add(i*i)
# print(set6)

# set7={i*i for i in range(1,11)}
# print(set7)

# set8={i**0.5 for i in range(1,101)}
# print(set8)

# set9={i for i in range(1,101) if i%2==0}
# print(set9)

# set10={i*i for i in range (1,101) if i%2!=0}
# print(set10)

# s='hello'
# vowels='aeiouAEIOU'
# set11=set()
# # set11={i for i in s if i in vowels}
# for i in s:
#     if i in vowels:
#         set11.add(i)
# print(set11)


# print(frozenset(set11))

# l=[1,2,3,4,5,12,234]
# set12=set()
# for i in l:
#     if i%2!=0:
#         set12.add(i)
#         print(set12)

l=[1,2,3,4,5,12,234]
set13={i for i in l if i%2!=0}
print(set13)
