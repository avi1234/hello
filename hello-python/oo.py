

class Point:

    def __init__(self, x, y) -> None:
        self.x = x
        self.y = y

    def move(self):
        print('move')

    def draw(self):
        print(f'draw ({self.x}, {self.y})')

class SubPoint(Point):
    def printX(self):
        print(f'just x {self.x}')





point1 = Point(10, 20)
point1.draw()

sub = SubPoint(1,2)
sub.printX()