
class car:

    no_of_wheels =4

    #constuctor
    def __init__(self,brand,price):
        self.brand=brand
        self.price=price

    #class method
    def display(self):
        print(f"car of brand {self.brand} and price {self.price}.")
        # if self.brand=='bmw':
        #     car.no_of_wheels+=1
        # print(car.no_of_wheels)


    #static method
    @staticmethod
    def discount():
        print("10% , discount")

    #class method
    @classmethod
    def no_of_wheels(cls):
        print(cls.no_of_wheels)
    
bmw=car('bmw',50000) # object
bmw.display() #class method
bmw.discount() #static method

#--------------------------------

#q1

class InsufficientBalance(Exception):
    pass

class BankAccount:
    def __init__(self,account_number,account_holder,balance):
        self.account_number=account_number
        self.account_holder=account_holder
        self.balance=balance

    # def withdraw(self,withdrawled_amount):
    #     withdrawled_amount=float(input("enter amount to withdraw:"))
    #     self.balance-=withdrawled_amount
    #     if self.balance<withdrawled_amount:
    #         print("insufficient balance")
    #     else:
    #         print("withdrawal successful")
            

#     def withdraw(self,withdrawled_amount):

#         try:
#             withdrawled_amount=float(input("enter amount to withdraw:"))
#             self.balance-=withdrawled_amount
#             if self.balance<withdrawled_amount:
#                 raise InsufficientBalance("you dont have sufficient balance")
#             else:
#                 print("withdrawal successful")
#         except InsufficientBalance as e:
#             print(e)
            
            
# p1=BankAccount(123456789,'aashi',50000)
# p1.withdraw(10000)

# p2=BankAccount(23904,'rhoti',5000)
# p2.withdraw(9000)


#------------------------------------------

class BankAccount:
    def __init__(self,acc_no,balance=0):
        self.balance=balance
        self.acc_no=acc_no

    def withdraw(self,amount):
        if amount >  self.balance:
            raise RuntimeError('insufficient balance')
        if amount<0:
            raise RuntimeError('invalid amount')
        self.balance-=amount
        print(f'withdrawal successful, remaining balance is{self.balance}')
        
p1=BankAccount(500)
try:
    try:
        try:
            p1.withdraw(501)
        except RuntimeError as e:
            print(e)
    except ValueError as e:
        print(e)
except Exception as e:
    print('something went wrong')



class person:
    def __init__(self):
        self.name='amam'
        self.__pin='2934'

    def print_info(self) :
        print(self.name)
    def __display_pin(self):
        print(self.__pin)


p1=person()
p1.print_info()
# p1.__display_pin()


#---------------------------------
#getter function
def get_atmpin(self):
    print(self.__atmpin)
    
def __set_atmpin(self,pin):
    self.__atmpin=pin
def access_atmpin(self,pin):
    self.__set_atmpin(pin)

p1=person()
p1.access_atmpin(1234)
p1.get_atmpin() 

#----------------------------


