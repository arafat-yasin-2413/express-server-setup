## Single Vendor ERD
### [ERD Link Draw.io](https://drive.google.com/file/d/1Z47rf-3kxCtttiy4fCkd5DV_AWoX-xmw/view?usp=sharing)




## mkmodule SETUP Guide

1. Run the below command in your `git bash terminal`: 
```bash
    nano ~/.bashrc
```
2. You will find it empty. Erase the word `exit`. then paste the below function: 
```bash
mkmodule() {
        mkdir -p src/modules/$1
        touch src/modules/$1/$1.service.ts
        touch src/modules/$1/$1.controller.ts
        touch src/modules/$1/$1.route.ts
}
```
3. Press `Ctrl + O` , `Enter`.
4. To Exit press `Ctrl + X`.
5. Now run 
```bash
source ~/.bashrc
```
### You are all set. 
- Just type `mkmodule moduleName`. It will create route, controller, service file indide the moduleName you had given.