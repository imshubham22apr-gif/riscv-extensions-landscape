#--------------------------------------------------------------
#29-10-25

from copyreg import constructor
from numpy import test


class classroom:

    #classroom is a blueprint
    def display_info(self): #method
        print(self.name,self.clas,self.roll)
        
    #self refers to current instance of class
    def set_info(self):
        self.name=input('enter name:')
        self.clas=input('enter class:')
        self.roll=input('enter roll:')

# s1=classroom() #object
# s1.name='shubham'
# s1.clas='10'
# s1.roll=1

# s2=classroom() #object
# s2.name='rohit'
# s2.clas='10'
# s2.roll=2

# s1.display_info()
# s2.display_info()

# ----------------

# s1=classroom()
# s1.set_info()
# s1.display_info()

# s2=classroom()
# s2.set_info()
# s2.display_info()

# s3=classroom()
# s3.set_info()
# s3.display_info()

#--------------------------------------------------------------

### CONSTURCTOR: it is a method that is invoked (called) when an object is created.
# types of constructors:
# 1. default constructor : no parameter
# 2. parameterized constructor : has parameters


class Classplus:

    #attribute
    color=''
    company=''

    #method/object/contructor
    def __init__(self,company,color):
        self.company=company
        self.color=color
        print(f"color for {self.company} is {self.color}")


pst=Classplus('pst','yellow')
testbook=Classplus('testbook','white')

#-------------------

class classroom:

    def __init__(self,n,r,a):
        self.name=n
        self.roll=r
        self.age=a   

    # def __init__(self, color):
    #     print('this is constructor named car and color is ' ,color)

    def display_info(self): #method
        print(self.name,self.roll,self.age)\
        
    def change_college(college):
        college=college

#main
s1=classroom('shubham',1,10)
s1.display_info()

s2=classroom('rohit',2,11)
s2.display_info()

print(classroom.change_college('scaler'))

#-------------------------------------------

#creating cusrtom error using Exception class
# class NegativeError(Exception):
#     pass

# try:
#     a=int(input('enter a no:'))
#     if a<0:
#         raise NegativeError('number is negative')
# except NegativeError as e:
#     print(e)



#-----------------------------------------


# try :
#     a=int(input('enter a no :'))
#     if a<0:
#         class NegativeError(Exception):
#             pass
#         raise NegativeError('number is negative')
#     elif a>100:
#         class PositiveError(Exception):
#             pass
#         raise PositiveError('number is positive')
#     else:
#         print('number is', a)

# except NegativeError as e:
#     print(e)

# except PositiveError as e:
#     print(e)

# except Exception as e:
#     print(e)

#--------------------------------------------

class laptop:
    def __init__(self,brand='',price=0):
        self.brand=brand
        self.price=price
    
    def turn_on(self):
        print(self.brand,'laptop is turned on')
    def display_info(self):
        print(self.brand,self.price)
    
laptop1=laptop('dell',50000)
laptop1.turn_on()
laptop1.display_info()

laptop2=laptop('hp',60000)
laptop2.turn_on()
laptop2.display_info()

laptop3=laptop('lenovo',70000)  
laptop3.turn_on()
laptop3.display_info()

#------------------

class employee:
    def __init__(self,name,salary, department):
        self.name=name
        self.salary=salary
        self.department=department
    def bonus(self):
        if self.department=='sales':
            self.salary=self.salary+self.salary*0.1
        else:
            self.salary=self.salary+self.salary*0.05

    def display_info(self):
        print(self.name,self.salary,self.department)

emp1=employee('shubham',50000,'sales')
emp1.bonus()
emp1.display_info()

emp2=employee('rohit',60000,'hr')
emp2.bonus()
emp2.display_info()

#------------------------

class calculator:
    def add(self,a,b):
        return a+b
    def subtract(self,a,b):
        return a-b
    def multiply(self,a,b):
        return a*b
    def divide(self,a,b):
        return a/b

cal=calculator()
print(cal.add(2,3))
print(cal.subtract(2,3))
print(cal.multiply(2,3))
print(cal.divide(2,3))
