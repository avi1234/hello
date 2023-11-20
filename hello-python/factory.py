from abc import ABCMeta, abstractmethod
import string

class IPerson(metaclass=ABCMeta):

    @abstractmethod
    def person_method():
        """ Interface Method """

class Student(IPerson):
        def __init__(self) -> None:
            self.name = "Basic Student Name"

        def person_method(self):
            print("I am a student")

class Teacher(IPerson):
        def __init__(self) -> None:
            self.name = "Basic Teacher Name"

        def person_method(self):
            print("I am a teacher")

class PersonFactory:

    @staticmethod
    def build_person(person_type: string) -> IPerson:
        if(person_type.lower() == "student"):
            return Student()
        if(person_type.lower() == "teacher"):
            return Teacher()
        return None


p1 = Student()
p1.person_method()

p2 = Teacher()
p2.person_method()

choice = input("Enter person type: ")

person = PersonFactory.build_person(choice)

if person is not None:
    person.person_method()
