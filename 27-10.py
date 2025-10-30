# while True:
    # a,b=int(input('enter a no:')),int(input('enter another no:'))

    # try:
    #     res=a/b
    # except ZeroDivisionError:
    #     print('cannot divide by zero')
    # except ValueError:
    #     print('invalid input')
    # except Exception:
    #     print('something went wrong')
    # else:
    #     print(res)
    # finally:
    #     print(' code is running well')
        
#errors:
# terminates the programs
# syntax , indentation, runtime
# compile time 

#exceptions:
# handles the errors
# type, ZeroDivision, value, key , name, index, attribute 
# run time
# handles the errors by try-except


    # try :
    #     d={
    #         'a':1,
    #         'b':2
    #     }
    #     val = d['c'] 

    # except KeyError: 
    #     print('key not found')
    # except IndexError:
    #     print('index not found')
    # except ValueError:
    #     print('value not found')
    # except:
    #     print('something went wrong')
        
    # else:
    #     print(val)
        

from calendar import c
from tkinter import E


try:
    l=[1,2]
    print(l[4])
    print(l[1]+'ji')
except IndexError:
    print('index not found')    
except TypeError:
    print('type error')
except:
    print('something went wrong')

#attribute error?
#every nonsense is an attribute error







# oh that's a good number !
#class-2

try:
    try:
        a= int(input('enter a no:'))
        b= int(input('enter another no:'))
        res=a/b
    except ValueError:
        print('invalid input')
except ZeroDivisionError:
    print('cannot divide by zero') 
except Exception:
    print('something went wrong', Exception)
else:
    print(res)
finally:
    print(' code is running well')

#class 
class car:
    #attributes
    company=''
    color=''
    number=0

    def display_info(self):  
        # self refers to current instance of class
        print(self.company,self.color,self.number)
    
#objects
c1=car()
c1.company='maruti'
c1.color='red'
c1.number=1234

c2=car()
c2.company='tata'
c2.color='blue'
c2.number=5678


#calling methods
c1.display_info()
c2.display_info()


    
