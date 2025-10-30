
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
            

    def withdraw(self,withdrawled_amount):

        try:
            withdrawled_amount=float(input("enter amount to withdraw:"))
            self.balance-=withdrawled_amount
            if self.balance<withdrawled_amount:
                raise InsufficientBalance("you dont have sufficient balance")
            else:
                print("withdrawal successful")
        except InsufficientBalance as e:
            print(e)
            
            
p1=BankAccount(123456789,'aashi',50000)
p1.withdraw(10000)

p2=BankAccount(23904,'rhoti',5000)
p2.withdraw(9000)

