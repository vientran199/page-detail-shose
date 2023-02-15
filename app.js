const sizes = document.querySelectorAll('.size'); //chọn tất cả các thành phần có class là size lưu vào sizes
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackground');

let preColor = "blue";
let animationEnd = true;

function changeSize(){
    //classList.remove(): xóa class. forEach(): thực thi hàm cho từng element
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    if(!animationEnd) 
    {
        return;
    }
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let preGradient = document.querySelector(`.gradient[color="${preColor}"]`)

    colors.forEach(color => color.classList.remove('active'));
    this.classList.add('active');

    //document.documentElement.style. : dùng để thay đổi thược tính của biến root
    document.documentElement.style.setProperty('--primary',primary);

    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g =>g.classList.remove('first','second'));
    gradient.classList.add('first');

    preGradient.classList.add('second');

    preColor = color;

    animationEnd = false;

    gradient.addEventListener('animationend',() => {
        animationEnd = true;
    })
}
//ađEvevtListener('tên event', hàm thực hiện):
sizes.forEach(size => size.addEventListener('click',changeSize));

colors.forEach(color => color.addEventListener('click',changeColor));


let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    if(x.matches){
        // Lấy giá trị chiều cao của thành phần shoe đầu tiền là blue
        let shoeHeight = shoes[0].offsetHeight; 
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}
changeHeight();
window.addEventListener('resize', changeHeight);