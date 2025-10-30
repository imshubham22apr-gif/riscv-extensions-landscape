
# def convert():
#     while True:
#         try:
#             n = int(input('enter a temperature in celsius:'))
#             f = (n*9/5)+32
#         except n<0:
#             print('enter a ')
#         else:
#             print('given input in celsius:',n)
#             print('given input in fahrenheit:',f)
# convert()

# def convert():
#     try:
#         n = int(input('enter a temperature in celsius:'))
#         f = (n*9/5)+32
#     except n<-273.15:
#         print('temp below absolute zero not valid ')
#     else:
#         print('given input in fahrenheit:',f)
# convert()


# def convert(n):
#     if n<273.15:
#         print('temp below absolute zero not valid ')
#         # raise ValueError('temp below absolute zero not valid ')
#     else:
#         f = (n*9/5)+32
#         print('given input in fahrenheit:',f)
# convert(-999)


# try:
#     n=float(input('enter a temperature in celsius:'))

# except ValueError:
#     print('temp below absolute zero not valid ')
# except Exception:
#     print('something went wrong')
# else:
#     f = (n*9/5)+32
#     print('given input in fahrenheit:',f)


#q2

file_name=input('enter a file name:')
try:
    f=open(file_name,'r')
except FileNotFoundError:
    print('file not found')
except Exception:
    print('something went wrong')
except PermissionError:
    print('permission denied')

else:
    print(f.read()) 
