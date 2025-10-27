from sys import exec_prefix
from tkinter import E, N


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
# syntax , indentation
# compile time 


#exceptions:
# handles the errors
# type, ZeroDivision, value
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




