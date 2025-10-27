# l1=[1,2,3]
# l2=[4,5,6]
# for i in range(len(l1)):
#     for j in range(len(l2)):
#         print(l1[i],l2[j])


# l=[2,3,4,5,5]
# print(len(l))

from numpy import append


l=[1,2,3,5,6]


n=len(l)
p_sum=[0]*n
p_sum[0]=l[0]
for i in range(1,n):
    p_sum[i]=p_sum[i-1]+l[i]
print(p_sum)

#same for suffix sum

s_sum=[0]*n
s_sum[n-1]=l[n-1]
for i in range(n-2,-1,-1):
    s_sum[i]=s_sum[i+1]+l[i]
print(s_sum)


L=[2,3,4,5]
ssum=[]
s=0
for i in L:
    ssum=s+l(i) 
    ssum.insert(0,s)
print(ssum)
