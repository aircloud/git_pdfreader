#include <iostream>
using namespace std;

class Bar
{
public:
    int operator()(int a, int b)
    {
        int c = a+b;
        return c;
    }
private:
    int haha;
};
int main(void)
{
    Bar haha;
    std::cout<<haha(3,5)<<endl;
    
}