
# #frequency map

x = 'aabbcc'
d = {}
for i in x:
    if i in d:
        d[i] += 1
    else:
        d[i] = 1
print(d)




# d[i]=d.get(i,0)+1
# print(d)


# class Solution(object):
#     def runningSum(self, nums):
#         """
#         :type nums: List[int]
#         :rtype: List[int]
#         """
#         l=[]
    
#         for i in range((nums)+1):
#             runningSum[i]=runningSum[i-1]+nums[i]
#             l.append(runningSum)
#         print(l)  
