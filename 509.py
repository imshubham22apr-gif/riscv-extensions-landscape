#odd even checker
a=int(input('enter a no:'))
if a%2==0:
    print(f'{a} is even')
else:
    print(f'{a} is odd')


#problem
# teamA=200
# teamB=210

# if teamA>teamB:
#     print('teamA wins')
# elif teamA==teamB:
#     print('tie')
# else:
#     print('teamB wins')


#defining a database like {'aman':47289, 'rahul':12345,'saurabh':12345} a signn in (input username, provide a generated 5 digit code) , login page (input username, input code)

# database={'aman':47289, 'rahul':12345,'saurabh':12345}
# a=int(input('what do want ot do? \n 1.signin \n 2.login \n enter your choice:'))
# if a==1:
#     username=input('enter your username:')
#     code=int(input('enter a 5 digit code:'))
#     database[username]=code
#     print(database)
    
# elif a==2:
#     username=input('enter your username:')
#     code=int(input('enter a 5 digit code:'))
#     if database[username]==code:
#         print('login successful')

#     else:l
#         print('login failed')



#use if else , input age, if 0 to 3 print toddler meal , 4 to 12 print child meal , 13 to 19 print teen meal , 20 to 59 print adult meal , 60 and above print senior meal
# b=int(input('enter your age:'))
# if b<=0 or b<=3:
#     print('toddler meal')
# elif b<=12:
#     print('child meal')
# elif b<=19:
#     print('teen meal')
# elif b<=59:
#     print('adult meal')
# elif b>=100:
#     print('senior meal')
# else:
#     print('invalid age')

#child=5,senior=7, adult(member=10, non-member=12)

age=int(input('enter your age:'))
if age >=0 and age<=12:
    print('child:ticket price=$5')
elif age>=13 and age<=60:
    member=int(input('are you a member? \n 1.yes \n 2.no \n enter your choice:'))
    if member==1:
        print('adult member:ticket price=$10')
    elif member==2:
        print('adult non-member:ticket price=$12')
    else:
        print('invalid choice')
elif age>60:
    print('senior:ticket price=$7')
else:
    print('invalid age')

