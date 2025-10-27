

# def name():
#     n=input('enter your name:')
#     print(f'hi {n} !')
# name()

# def greet (name):
#     print(f'Welcome to polaris school of technology, Mr. {name} !')
# greet('Aashish')

# def sq(num):
#     return float(num*num)
# print(sq(5))

# def sum():
#     a=int(input('enter a no:'))
#     b=int(input('enter another no to add to it :'))
#     print (f'their sum is', a+b)
# sum()

# def sum1(a,b):
#     print (f' sum of {a} and {b} is', a+b)#global
#     e=4
#     f=3
#     print (f' sum of {e} and {f} is', e+f)#local
# sum1(5,6)

# def area_peri():
#     l=int(input('enter length:'))
#     b=int(input('enter breadth:'))
#     area=l*b
#     perimeter=2*(l+b)
#     print(f'area of rectangle is {area} and its perimeter is {perimeter}')
# area_peri()

# def factoriL():
#     n=int(input('enter a no:'))
#     f=1
#     for i in range(1,n+1):
#         f=f*i
#     print(f)
# factoriL()

# a=10
# a=a+10
# print(a)
# def sq():
#     global a 
#     a=a+4
#     print(a)
# sq(20)
# print(a)

# a=10
# a=a+10
# print(a)
# def sq(n):
#     global a 
#     a=a+4
#     print(a)
#     b=50
#     print(b)
# sq(20)
# print(a)

# def q3():
#     #inputs 5 subs , prints total , avg
#     sub1=int(input('enter marks of sub1:'))
#     sub2=int(input('enter marks of sub2:')) 
#     sub3=int(input('enter marks of sub3:'))
#     sub4=int(input('enter marks of sub4:'))
#     sub5=int(input('enter marks of sub5:'))
#     total=sub1+sub2+sub3+sub4+sub5
#     avg=total/5
#     print(f'total is {total} and avg is {avg}') 
# q3()

# def palindrome():
#     n=int(input('enter a no:'))
#     rev=0
#     temp=n
#     while n>0:
#         rem=n%10
#         rev=rev*10+rem
#         n=n//10
#     if temp==rev:
#         return True and print('palindrome')
#     else:
#         print('not palindrome')
#     return rev
# palindrome()

def pal(n):
    rem=0
    while True :
        rem=n*10+rem//10
        n=n//10
        print(rem)

n=int(input('enter a no:'))
pal(n)
