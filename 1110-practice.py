#finding minimum and maximum elements
# l=[2,4,4,4,55,0]
# min=max=l[0]
# for i in l:
#     if i<max:
#         i=max
#     elif i>min  :
#         i=min
# print(min)
# print(max)


# l=[1,24,2,4,2,5]
# for i in l:
#     res=[]
#     a=l.pop()
#     res.append(a)
#     print(res)

from cgi import print_environ_usage
from re import A


l=[1,24,2,4,2,5]
print(l[-1:-len(l)-1:-1])

#power of two
x=0
n=10
while x<=n:
    print(2**x)
    x=x+1

#subarray sum equals to k
def subarraySum(nums, k):
    count=0
    for i in range(len(nums)):
        sum=0
        for j in range(i,len(nums)):
            sum+=nums[j]
            if sum==k:
                count+=1
    return count

#two pointers 
def find_sum_pair(sorted_arr, target):
    """Finds a pair that sums to a target in a sorted array using two pointers (O(n))."""
    left = 0
    right = len(sorted_arr) - 1

    while left < right:
        current_sum = sorted_arr[left] + sorted_arr[right]
        if current_sum == target:
            return (sorted_arr[left], sorted_arr[right])
        elif current_sum < target:
            # Sum is too small, need a larger number, so move left pointer forward
            left += 1
        else: # current_sum > target
            # Sum is too large, need a smaller number, so move right pointer backward
            right -= 1
    
    return None # No pair found

# Example
arr = [1, 2, 4, 7, 11, 15]
target_sum = 9
pair = find_sum_pair(arr, target_sum)
print(f"Pair that sums to {target_sum}: {pair}") # Output: (2, 7)



#q-two pointers
def find_sum_pair(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        current_sum = arr[l] + arr[r]
        if current_sum == target:
            return (arr[l], arr[r])
        elif current_sum < target:
            l += 1
        else:
            r -= 1
    return None

print(find_sum_pair([1, 2, 4, 7, 11, 15], 9)) # Output: (2, 7)

#q-subarray sum equals to k
def subarraySum(nums, k):
    count=0
    for i in range(len(nums)):
        sum=0
        for j in range(i,len(nums)):
            sum+=nums[j]
            if sum==k:
                count+=1
    return count

#q-tp
def find_sum_pair(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        sum = arr[l] + arr[r]
        if sum == target:
            return (arr[l], arr[r])
        elif sum < target:
            l += 1
        else:
            r -= 1
    return None

print(find_sum_pair([1, 2, 4, 7, 11, 15], 26)) # Output: (2, 7)


#q-kadane
def kadane(l):
    cmax,gmax=0,-float('inf')
    for i in l:
        cmax+=i
        gmax=max(gmax,cmax)
        cmax=max(cmax,0)  
    print(gmax) 
kadane([-0,1])

#q-frequency map
d = {}
for i in 'aashish':
    if i in d:
        d[i] += 1
    else:
        d[i] = 1
print(d)

#d-prefix sum
# l=[1,2,3,4,5]
# p_sum=[0]*len(l)
# p_sum[0]=l[0]
# for i in range(1,len(l)):
#     p_sum[i]=p_sum[i-1]+l[i]
# print(p_sum)

# l=[1,2,3,4]
# psum=0*len(l)
# psum[0]=l[0]
# for i in range(1,len(l)):
#     psum[i]=psum[i-1]+l[i]
# print(psum)

# nums = [1,2,3,4,5]
# prefix_sum = [nums[0]]
# for i in range(1, len(nums)):
#     prefix_sum.append(prefix_sum[-1] + nums[i])
# print(prefix_sum)

#psum
l=[2, 4, 1, 5, 3]
psum=[]
sum=0
for i in l:
    sum+=i
    psum.append(sum)
print(psum)

#ssum
l=[1,2,3,4,5]
ssum=[]
s=0
for i in range(-1,-len(l)-1,-1):
    s+=l[i]
    ssum.insert(0,s)
print(ssum)
 
 

#power of 2
def powe(n):
    x=0
    while n>x:
        x+=1
        print(2**x)
powe(5)


