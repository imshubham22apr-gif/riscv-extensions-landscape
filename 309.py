#implicit type conversion
y='rahul'+'5'
print(y)
print(type(y))

#explicit type conversion
x=int(5.5)
print(x)
x=x+5.9
print(x)

print(int(9.9), float(True),str(123)+'abc')
print('my age is',(20+1), 'years old')
print(f'my age is {24+1} years old')


#CALCULATOR-1
a=int(input('enter a no:'))
b=int(input('enter another no to do operations on it:'))
print (f'sum of {a} and {b} is {a+b}')
print (f'difference of {a} and {b} is {a-b}')
print (f'product of {a} and {b} is {a*b}')
print (f'quotient of {a} and {b} is {a/b}')



#CALCULATOR-2
a=int(input('enter a no:'))
b=int(input('enter another no to do operations on it:'))
print(
    '''
menu
1.add
2.sub
3.mul
4.div
5.exit
    '''
)
choice=int(input('enter your choice:'))
if choice==1:
    print(a+b)
elif choice==2:
    print(a-b)
elif choice==3:
    print(a*b)
elif choice==4:
    print(a/b)
elif choice==5:
    exit()
else:
    print('invalid choice')

    



