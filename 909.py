# for i in range(5):
#     for j in range(i+1):
#         print("*", end=" ")
#     print()


# #fact
# n=int(input("enter a no:"))
# f=1
# for i in range(1,n+1):
#     f=f*i
# print(f)

# #fibbonacci
# n=int(input("enter a no:"))
# a=0
# b=1
# for i in range(n):
#     print(a)
#     c=a+b
#     a=b
#     b=c

# #     *
# #    * *
# #   * * *
# #  * * * *
# # * * * * *


# for i in range(5):
#     for j in range(5-i):
#         print(" ", end=" ")
#     for k in range(i+1):
#         print("*", end=" ")
#     print()


# for i in range(5):
#     if i==3:
#         break
#     else:   
#         continue
# print('hello')

# n=int(input("enter a no:"))
# a,b=0,1
# for i in range(n):
#     c=a+b
#     a=b
#     b=c
#     print(a)
    
# a=int(input("enter a no:"))
# b=int(input("enter another no:"))
# c=int(input("enter another no:"))
# if a>b and a>c:
#     print(a , 'is largest')
# elif b>a and b>c:
#     print(b , 'is largest')
# elif c>a and c>b:
#     print(c, 'is largest')
# elif a==b and b==c:
#     print('all are equal')
# elif a==b and a!=c:
#     print(a, 'and', b, 'are equal')
# elif a==c and a!=b:
#     print(a, 'and', c, 'are equal')
# elif b==c and b!=a:
#     print(b, 'and', c, 'are equal')

# n=int(input("enter year:"))
# if n%4==0 and n%100!=0 or n%400==0:
#     print(f'{n} is leap year')

# else:
#     print(f'{n} is not leap year') 

import random as r
while True:
    print('''
    1.rock 
    2.paper
    3.scissor
    ''')
    a  = int(input("enter a no:"))
    l= ['rock', 'paper', 'scissor']
    if  a==1:
        print('you entered',l[0])
    elif a==2:
        print('you entered',l[1])
    elif  a==3:
        print('you entered',l[2])
    p=r. randint(1,3)
    print('computer entered',l[p-1])
    if    (a==1 and p==2) or (a==2 and p==3) or (a==3 and p==1):
        print('you won')
    elif   a==p:
        print('draw')
    else  :
        print('you lost')




