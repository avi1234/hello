from helpers.my import sum, greet_person


def emptyFunc():
    print('🙋‍♂️')
    return


print('calling empty func')
res = emptyFunc()
if not res:
    print('empty')
else:
    print(res)

# comments

# variables
print('hello world')

name = 'John'
age = 32

print(name)

# your_name = input('please enter your name: ')
your_name = 'John'

print('hi ' + your_name)

# my_age = int(input('enter age '))
my_age = 66

print(type(my_age))

print('number to string ' + str(my_age))

print(f'number to string 🆒  {my_age}')

if my_age < 18:
    print('nope ❌')
elif my_age > 65 and True:
    print('👑')
else:
    print('You can drink! 🍸')


# functions

# return None
def say_hello(name: str, greet: str = 'aloha') -> None:
    '''
    func decription
    bla bla bla
    '''
    print(f'✋ {greet} {name}')

say_hello('Gil')

greet_person('Daniel')

print(sum(2, 3))

# None is nothing

# lambda - anonymous function

sum2 = lambda a,b: a+b
print(sum2(1,2))

# test
assert sum2(2,4) == 6, '❌ sum2 should return 6 for 2,4'

# arrays, lists

fruits = ['🍏', '🍊', '🍌', '🍓']

fruits.append('🍍')

print(fruits)

print(fruits[0])

# index backward... -1 is the last item
print(fruits[-1]) # prints 🍍

print(fruits[-2]) # prints 🍓

print(fruits[2: len(fruits) - 1]) # ['🍌', '🍓']

print(fruits[0:3:2])

print(fruits[::-1])

print(fruits[2:])

# dictionary

person = {
    'name': 'John',
    'age': 31,
    'get_signature': lambda: f"🔆 {person['name']}, {person['age']}",
}

print(person['get_signature']())

# tuples - immutable objects
numbers = (1,2)
print(numbers)

# sets - array with unique options

things = {1,2,2,3,3,5}
print(things)
print(2 in things)

new_array1 = [1,2,3,3,3,3]
new_array2 = [1,2,4,4,4]
unique_set = set(new_array1 + new_array2)
print(unique_set)

# loops
for f in fruits:
    print(f"🛕 don't forget to eat {f}")

# return array of tuples so it will be immutable
for index, fruit in enumerate(fruits):
    print(fruit)

for _ in range(5):
    print("🌜 good night")

print(list(map(lambda num: num * 2, [1,2,3])))

print([number * 2 for number in [1,2,3]])

# print only odd numbers
print([number for number in [1,2,3,4] if number % 2 != 0])

