#------------------------------------------
# iterative statements

# for i in range(1,6):
#     print('aashish-', i)

# for i in range(0,12,2):
#     print(i)

# for i in range(10,-2,-2):
#     print(i)

# n=int(input("enter a no:"))
# s=0
# for i in range(1,n+1):
#     s+=i
# print(s)

# s=0
# while s<10:
#     s+=1
#     print('bhai', s)


# s=0
# while s<10:
#     s+=2
#     print('bhai', s)

# for i in range(100):
#     print('polaris')  

# i=0
# while i<100:
#     print('polaris')
#     i+=1


##print even numbers to n
# n=int(input('enter a no:'))
# i=2
# while i<=n:
#     print(i)
#     i+=2

# #print sum of n terms
# n=int(input('enter a no:'))
# s=0
# i=1
# while i<=n:
#     s+=i
#     i+=1
# print(s)


# factorial while loop
# n=int(input('enter a no:'))
# f=1
# i=1
# while i<=n:
#     f*=i
#     i+=1
# print(f)

# #factorial for loop
# n=int(input('enter a no:'))
# f=1
# for i in range(1,n+1):
#     f*=i
# print(f)

#fibbonacci
# n=int(input('enter a no:'))
# a=0
# b=1
# for i in range(n):
#     print(a)
#     c=a+b
#     a=b
#     b=c

#fibbonacci sum 
# n=int(input('enter a no:'))
# a=0
# b=1
# s=0
# for i in range(n):
#     s+=a
#     c=a+b
#     a=b
#     b=c
# print(s)

#fibbonacci while loop no of terms
# n=int(input('enter a no:'))
# a=0
# b=1
# i=0
# while i<n:
#     print(a)
#     c=a+b
#     a=b
#     b=c
#     i+=1

#keep taking num , until u get 0, also add them 
# n=int(input('enter a no:'))
# s=0
# while n==0:

#     s+=n
#     n=int(input('enter another no:'))
# print(s)

# n=int( input('enter a no:'))
# while True :
#     if n%3==0:
#         print('i am don')
#         n=int(input('enter another no:'))
#     else:
#         print('i am not don')
#         n=int(input('enter another no:'))


#input  a no, reverse and print it , inp=34, outp=43

n=int(input('enter a no to reverse :'))
rev=0
while n!=0:
    rev=rev*10+n%10
    n=n//10
print(rev)




