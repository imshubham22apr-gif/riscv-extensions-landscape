
#failed evaluation


#remove duplicates numbers
# from wsgiref.util import request_uri


# t = int(input())
# for i in range(0, t):
#     n = int(input())
#     li = list(map(int, input().split()))
    
#     # logic
#     set_n = set()
#     res = []
    
#     for ele in li:
#         if ele not in set_n:
#             set_n.add(ele)
#             res.append(ele)
            
#     print(len(res))
    
#     for ele in res:
#         print(ele, end=" ")
#     print()


#maximum subarray sum in array 



# two pointer approach to find palindrome
def isPal(s) :
    left =0
    right=-1
    while left > right:
        left+=1
        right-=1
        if s[left]!=s[right]:
            return False
        
        else:
            return True
s='aman'
print(isPal(s))