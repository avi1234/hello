import time

start = time.time()
count = 0
FILE_PATH = "data.csv"
with open(FILE_PATH) as file:
    for line in file:
        print(line)
        count = count + 1
end = time.time()
print("Execution time in seconds: ", (end - start))
print("No of lines printed: ", count)


with open(FILE_PATH, "a") as file:
    # file.write("\n100,Robert White,30,Nashville")
    pass


def simple_generator():
    yield 1
    yield 2
    yield 3


# Using the generator in a loop
for value in simple_generator():
    print(value)
