
# while True:
# #student attendance tracker
#     name=input('enter student name:').strip()
#     total_days=int(input('enter total classes:'))
#     day=1
#     while day<=total_days:
#         day+=1
#     if day==3:
#         continue
#     elif day==total_days:
#         break
#     for i in range (day):
#         print(f'attendance is recorded for {name} on day {day}')



# #corrected code
# while True:
#     name=input('enter student name:').strip()
#     total_days=int(input('enter total classes:'))
#     day=1
#     while day<=total_days:
#         if day==3:
#             day+=1
#             continue
#         else:
#             print(f'attendance is recorded for {name} on day {day}')
#             day+=1


#workout timer countdown


workout_time=int(input('enter workout time:'))
while workout_time>0:
    workout_time-=1
    print(f'the time remaining is {workout_time} seconds')
print("workout completed, great job!")




