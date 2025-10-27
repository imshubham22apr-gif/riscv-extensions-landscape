#input name, age , marks, convert and display formatted message 

import math

name=input('enter your name:')
age=int(input('enter your age:'))
marks=(input('enter your marks:'))
print(f'your name is {name} and your age is {age} and your marks is {marks}')

a=math.sin(0)
print(a)

# ans should not exceed 10007
a=int(input("enter a no"))
b=int(input("enter another no"))
pow=a**b
if pow>=10007:
    print(pow)
else:
    print('error')


#ans should not exceed 10007
ans=(a**b)%10007
print(ans)

#ans should not exceed 10007    
ans=(10009)%10007==2
print(ans)


#take two int swap them without adding extra variable 
a=int(input("enter a no"))
b=int(input("enter another no"))
a=a+b
b=a-b
a=a-b
print(a,b)
    
# take two int swap them with adding extra variable
temp=a
a=b
b=temp
print(a,b)

#given a,b,c print true if a>b and b>c else print false
a=int(input("enter a no"))
b=int(input("enter another no"))
c=int(input("enter another no"))
print('true' if a>b and b>c else 'false')


p=int(input("enter principle"))
r=int(input("enter rate"))
t=int(input("enter time"))
print("simple interest is",(p*r*t)/100)


# take salary , calc total assuming rent allowance 20% travel allowance is 10%
sala=int(input("enter salary"))
print("total salary is",sala+(sala*20/100)+(sala*10/100))

# input points as coordinates then calculate distance between them
x1=int(input("enter x1"))
y1=int(input("enter y1"))
x2=int(input("enter x2"))
y2=int(input("enter y2"))
print(((x2-x1)**2+(y2-y1)**2)**0.5)

#-----------------------------------------------------------------------------


# 1
sub1=input('enter 1st sub marks')
sub2=input('enter 2nd sub marks')
sub3=input('enter 3rd sub marks')
print(f'average of marks is {(int(sub1)+int(sub2)+int(sub3))/3}')

# 2
age=25
print(f'your age is {str(age)}')

# 3
price=str('499.99')
print(f'net price after delivery charges {float(price)+50}')

# 3
pri=float('499.99')
pri+=50
print(pri)

# 4
pen=12
note=45
print(f'total cost of 3 pen and 4 note is Rs. {3*(pen)+4*(note)}')


#5
passing=40
score=78
while score>=passing:
    print('pass')
    break
else:
    print('fail')

