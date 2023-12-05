const data = []
const frame = document.getElementById("game")

const scoreFrame = document.getElementById("score")

const height = 20
const width = 10

scoreFrame.style.right = "calc(50% + "+width*15+"px)"
scoreFrame.style.bottom = "calc(50% - "+height*15+"px)"

frame.style.width = width*30+"px"
frame.style.height = height*30+"px"

frame.style.top = "calc(50% - "+height*15+"px)"
frame.style.left = "calc(50% - "+width*15+"px)"

for (let x=0;x<width;x++) {
    data[x] = []
    for (let y=0;y<height;y++) {
        data[x][y] = 0
        const el = document.createElement("div")
        el.classList = "bg color0"

        el.style.left = (x*30+5)+"px"
        el.style.top = (y*30+5)+"px"

        el.id = x+"/"+y

        frame.appendChild(el)
    }
}

const down = (id) => {
    document.getElementById(id).style.borderStyle = "inset"
}
const up = (id) => {
    document.getElementById(id).style.borderStyle = "outset"
}
const playagain = () => {
    document.body.remove()
    location.reload()
}


const shapes = [
    [[
        "1"
    ]],[[
        "11"
    ],[
        "1",
        "1"
    ]],[[
        "111"
    ],[
        "1",
        "1",
        "1"
    ]],[[
        "11",
        "01"
    ],[
        "01",
        "11"
    ],[
        "10",
        "11"
    ],[
        "11",
        "10"
    ]],[[
        "1111"
    ],[
        "1",
        "1",
        "1",
        "1"
    ]],[[
        "111",
        "001"
    ],[
        "01",
        "01",
        "11"
    ],[
        "100",
        "111"
    ],[
        "11",
        "10",
        "10"
    ]],[[
        "111",
        "100"
    ],[
        "11",
        "01",
        "01"
    ],[
        "001",
        "111"
    ],[
        "10",
        "10",
        "11"
    ]],[[
        "111",
        "010"
    ],[
        "01",
        "11",
        "01"
    ],[
        "010",
        "111"
    ],[
        "10",
        "11",
        "10"
    ]],[[
        "110",
        "011"
    ],[
        "01",
        "11",
        "10"
    ]],[[
        "011",
        "110"
    ],[
        "10",
        "11",
        "01"
    ]],[[
        "11",
        "11"
    ]]
]

let totalScore = 0

const score = (x,y,sc) => {
    const element = document.createElement("p")
    element.classList = "score"

    element.innerHTML = sc

    element.style.left = (x)*30+15+"px"
    element.style.top = (y)*30+"px"

    frame.appendChild(element)

    totalScore += sc

    const tx = document.getElementById("scoretext")

    tx.innerHTML = totalScore

    run(60,30,(alpha)=>{
        element.style.top = ((y)*30-alpha*60)+"px"
    },()=>{
        run(60,30,(alpha)=>{
            element.style.top = ((y)*30-60-alpha*60)+"px"
            element.style.opacity = 1-alpha
        },()=>{
            element.remove()
        })
    })
}

const createF = (shape,x,y,c,c1) => {
    const element = document.createElement("div")
    element.classList = "sub"


    element.style.left = (x)*30+"px"
    element.style.top = (y)*30+"px"

    for (let x=0;x<shape.length;x++) {
        for (let y=0;y<shape[x].length;y++) {
            if (shape[x][y] == "1") {
                const block = document.createElement("div")
                block.classList = "bg color"+c+" "+c1
                block.style.left = (y*30+5)+"px"
                block.style.top = (x*30+5)+"px"
                element.appendChild(block)
            }
        }
    }

    frame.appendChild(element)
    return element
}

const rand = (m,n)=>{
    return Math.round(Math.random()*(n-m)+m)
}
const getTile = (x,y) => {
    if (current && (current[currentRot][y-Y])) {
        const c = current[currentRot][y-Y][x-X]
        if (c!="0" && c) {
            return currentColor
        }
    } if (data[x]) {
        return data[x][y]
    }
}
const getTile2 = (x,y) => {
    if (data[x]) {
        return data[x][y]
    }
}
const setTile = (x,y,c) => {
    if (c==undefined) {
        c=0
    }
    data[x][y] = c
}

let next = shapes[rand(0,shapes.length-1)]
let nextColor = rand(1,10)

const getNew = () => {
    current = next
    next = shapes[rand(0,shapes.length-1)]
    currentRot = 0
    currentColor = nextColor
    nextColor = rand(1,10)

    if (document.getElementById("next")) {
        document.getElementById("next").remove()
    }
    const nxt = document.createElement("div")
    nxt.classList = "next"
    nxt.id = "next"

    nxt.style.right = "calc(50% + "+width*15+"px)"

    const txt = document.createElement("p")
    txt.classList = "text next"
    txt.innerHTML = "Next"
    nxt.appendChild(txt)

    const f = document.createElement("div")
    f.classList = "nextframe"
    nxt.appendChild(f)

    let maxY = 0
    let maxX = 0

    for (let x=0; x<next[0].length; x++) {
        if (x > maxX) {
            maxX = x
        }
        for (let y=0; y<next[0][x].length; y++) {
            if (y > maxY) {
                maxY = y
            }
            if (next[0][x][y]=="1") {
                const el = document.createElement("div")

                el.style.right = (y*30+5)+"px"
                el.style.top = (x*30+15)+"px"
                el.classList = "bg color"+nextColor

                f.appendChild(el)
            }
        }
    }

    const w = (maxY+1)*30
    txt.style.width = w+"px"
    f.style.width = w+"px"

    nxt.style.width = w+10+"px"
    nxt.style.height = (maxX+1)*30+50+"px"

    nxt.style.top = "calc(50% - "+((maxX+1)*30+50)/2+"px)"

    document.body.appendChild(nxt)

    X = width/2-2
    Y = 0
    updated = false
    updateAll()
    let match = true
    for (let x=0;x<current[currentRot].length;x++) {
        if (match==true) {
            for (let y=0;y<current[currentRot][x].length;y++) {
                const t = getTile2(X+y,Y+x)
                if (current[currentRot][x][y]=="1" && (t!=0 && t!=undefined)) {
                    match = false
                    break
                }
            }
        } else {
            break
        }
    }
    if (match==false) {
        current = undefined
        updated = false
        updateAll()
        paused = true
        window.clearInterval(int)
        window.setTimeout(()=>{
            if (document.getElementById("hold")) {
                document.getElementById("hold").remove()
            }
            if (document.getElementById("next")) {
                document.getElementById("next").remove()
            }
            const el = document.getElementById("score")
                run(60,5*60,(alpha)=>{
                    alpha = (1-alpha)**2
                    el.style.right = "calc(50% + "+(alpha*width*15)+"px - "+(el.offsetWidth/2*(1-alpha))+"px)"
                    el.style.bottom = "calc(50% - "+(alpha*height*15)+"px - "+(el.offsetHeight/2*(1-alpha))+"px)"
                    el.style.fontSize = (20+((1-alpha)*30))+"px"
                },()=>{
                    document.getElementById("playagain").style.display = "block"
                })

            run(60,height,(alpha)=>{
                const Y = height-alpha*height
                run(60,width,(alpha)=>{
                    const X = width-alpha*width
                    const T = getTile2(X,Y)
                    if (T!=undefined && T!=0) {
                        score(X,Y,1)
                    }
                    setTile(X,Y,0)
                    updated = false
                    updateAll()
                    const F = createF("1",X,Y,"-3")
                    run(60,30,(alpha)=>{
                        F.style.opacity = 1-alpha
                    },()=>{
                        F.remove()
                    })
                    document.getElementById(X+"/"+Y).remove()
                })
            },()=>{
                
            })
        },1000)
    } else {
        paused = false
    }
}
const rayY = (Y,d) => {
    if (d>0) {
        let max = undefined
        const li=[]
        const l = current[currentRot].length
        for (let y=0; y<l; y++) {
            const L = current[currentRot][l-1-y]
            for (let x=0; x<L.length; x++) {
                if (L[x]=="1" && li[x]!="0") {
                    li[x]=0
                    const offset = l-1-y
                    for (let test=0;test<d;test++) {
                        const tile = getTile2(X+x,Y+offset+test+1)
                        if ((tile!=0) && (max==undefined || test<max)) {
                            max = test
                            break
                        }
                    }
                }
            }
        }
        return(max+1)
    }
}
const rayX = (X,d) => {
    if (d>0) {
        let max = undefined
        const l = current[currentRot].length
        for (let y=0; y<l; y++) {
            const L = current[currentRot][l-1-y]
            for (let x=0; x<L.length; x++) {
                if (L[L.length-x-1]=="1") {
                    for (let test=0;test<d;test++) {
                        const tile = getTile2(X+(L.length-x-1)+test+1,Y+(l-1-y))
                        if ((tile!=0) && (max==undefined || test<max)) {
                            max = test
                            break
                        }
                    }
                    break
                }
            }
        }
        return(max+1)
    } else {
        let max = undefined
        const l = current[currentRot].length
        for (let y=0; y<l; y++) {
            const L = current[currentRot][l-1-y]
            for (let x=0; x<L.length; x++) {
                if (L[x]=="1") {
                    for (let test=0;test>d;test--) {
                        const tile = getTile2(X+x+test-1,Y+(l-1-y))
                        if ((tile!=0) && (max==undefined || test<max)) {
                            max = test
                            break
                        }
                    }
                    break
                }
            }
        }
        return(max+1)
    }
}

const inc = (v) => {
    currentRot++
    if (currentRot>=current.length) {
        currentRot = 0
    }
    if (v==true) {
        let match = true
        for (let x=0;x<current[currentRot].length;x++) {
            if (match==true) {
                for (let y=0;y<current[currentRot][x].length;y++) {
                    if (current[currentRot][x][y]=="1" && getTile2(X+y,Y+x)!=0) {
                        match = false
                        break
                    }
                }
            } else {
                break
            }
        }
        if (match==false) {
            dec()
        }
    }
}
const dec = (v) => {
    currentRot--
        if (currentRot<0) {
            currentRot = current.length - 1
        }
    if (v==true) {
        let match = true
        for (let x=0;x<current[currentRot].length;x++) {
            if (match==true) {
                for (let y=0;y<current[currentRot][x].length;y++) {
                    if (current[currentRot][x][y]=="1" && getTile2(X+y,Y+x)!=0) {
                        match = false
                        break
                    }
                }
            } else {
                break
            }
        }
        if (match==false) {
            inc()
        }
    }
}

let paused = false

const place = () => {
    for (let x=0;x<current[currentRot].length;x++) {
        for (let y=0;y<current[currentRot][x].length;y++) {
            if (current[currentRot][x][y]=="1") {
                setTile(X+y,Y+x,currentColor)
            }
        }
    }
    current = undefined
    let used = false
    for (let y=0;y<height;y++) {
        let cont = true
        let r = 0
        for (let x=0;x<width;x++) {
            if (cont==true) {
                switch (getTile2(x,y)!=0 && getTile2(x,y)!=undefined) {
                    case true:{
                        if (x==width-1) {
                            paused = true
                            used = true
                            r++
                            run(width/0.1,width,(alpha)=>{
                                const f = createF(["1"],alpha*width-1,y,-3,"")
                                setTile(alpha*width-1,y,0)
                                for (let I=y;I>=0;I--) {
                                    setTile(alpha*width-1,I,getTile2(alpha*width-1,I-1))
                                    setTile(alpha*width-1,I-1,0)
                                }
                                updated = false
                                updateAll()
                                score(alpha*width-1,y,1)
                                run(60,30,(alpha)=>{
                                    const a = Math.sin(alpha*90*Math.PI/180)
                                    f.style.opacity = 1-a
                                },()=>{
                                    f.remove()
                                })
                            },()=>{
                                r--
                                if (r==0) {
                                    getNew()
                                }
                            })
                        }
                        break
                    } case false:{
                        cont=false
                        break
                    }
                }
            } else {
                break
            }
        }
    }
    if (used==false) {
        getNew()
    }
}

let holding = undefined
let holdingColor = 1

let current = undefined
let currentColor = 1

let X = 0
let Y = 0



let descendTimer = 0
let freezeTimer = 0

let currentRot = 0

let shadow = undefined

let updated = false
const updateAll = () => {
    if (updated == false && current != undefined) {
        updated = true
        if (shadow != undefined) {
            shadow.remove()
        }
        shadow = createF(current[currentRot],X,Y+rayY(Y,height)-1,currentColor,"color-1")
    } else if (current==undefined) {
        if (shadow != undefined) {
            shadow.remove()
        }
    }
    for (let x=0;x<width;x++) {
        for (let y=0;y<height;y++) {
            const el = document.getElementById(x+"/"+y)
            if (el) {
            const c=getTile(x,y)
            if (c) {
                el.classList = "bg color"+c
            } else {
                el.classList = "bg color0"
            }
            }
        }
    }
}

getNew()

let a = false
let aC = 0
let d = false
let dC = 0
let maxD = 60

const run = (fps,frames,func,rem) => {
    let F=0
    const upd = window.setInterval(()=>{
        F+=1
        func(F/frames)
        if (F>=frames) {
            if (rem) {
                rem()
            }
            window.clearInterval(upd)
        }
    },1000/fps)
}

document.onkeyup = () => {
    switch (event.key) {
        case "ArrowDown":{
            maxD=60
            break
        } case "ArrowLeft":{
            a=false
            break
        } case "ArrowRight":{
            d=false
            break
        }
    }
}
document.onkeydown = () => {
    if (current != undefined && paused==false) {
    switch (event.key) {
        case "e":{
            inc(true)
            updateAll()
            break
        } case "q":{
            dec(true)
            updateAll()
            break
        } case "ArrowLeft":{
            a = true
            aC = maxD
            break
        } case "ArrowRight":{
            d = true
            dC = maxD
            break
        } case "ArrowDown":{
            maxD = 2
            break
        } case " ":{
            const r = rayY(Y,height)
            const f = createF(current[currentRot],X,Y,"-3")
            let t = Y*30
            run(60,60,(alpha)=>{
                const a = 1-(1-alpha)**2
                f.style.top = t+((r-1)*30)+a*60+"px"
                f.style.opacity = 1-a
            },()=>{
                f.remove()
            })

            for (let yy=0;yy<r;yy++) {
                const ff = createF(current[currentRot],X,Y,"-3")
                let tt = (Y+yy)*30
                ff.style.top = tt+"px"
                run(60,5+yy/2,(alpha)=>{
                    ff.style.opacity = 1-alpha
                },()=>{
                    ff.remove()
                })
            }

            Y+=r-1
            place()
            break
        } case "ArrowUp":{
            if (holding) {
                let match = true
                for (let x=0;x<holding[0].length;x++) {
                    if (match==true) {
                        for (let y=0;y<holding[0][x].length;y++) {
                            if (holding[0][x][y]=="1" && getTile2(X+y,Y+x)!=0) {
                                match = false
                                break
                            }
                        }
                    } else {
                        break
                    }
                }
                if (match==true) {
                    const temp = current
                    const temp2 = currentColor
                    current = holding
                    currentColor = holdingColor
                    holding = temp
                    holdingColor = temp2
                    currentRot = 0
                }
            } else {
                currentRot = 0
                holding = current
                holdingColor = currentColor
                getNew()
            }
            if (document.getElementById("hold")) {
                document.getElementById("hold").remove()
            }
            const nxt = document.createElement("div")
            nxt.classList = "next"
            nxt.id = "hold"
        
            nxt.style.left = "calc(50% + "+((width*15)+10)+"px)"
        
            const txt = document.createElement("p")
            txt.classList = "text next"
            txt.innerHTML = "Holding"
            nxt.appendChild(txt)
        
            const f = document.createElement("div")
            f.classList = "holdframe"
            nxt.appendChild(f)
        
            let maxY = 0
            let maxX = 0
        
            for (let x=0; x<holding[0].length; x++) {
                if (x > maxX) {
                    maxX = x
                }
                for (let y=0; y<holding[0][x].length; y++) {
                    if (y > maxY) {
                        maxY = y
                    }
                    if (holding[0][x][y]=="1") {
                        const el = document.createElement("div")
        
                        el.style.left = (y*30+5)+"px"
                        el.style.top = (x*30+15)+"px"
                        el.classList = "bg color"+holdingColor
        
                        f.appendChild(el)
                    }
                }
            }
        
            const w = (maxY+1)*30
            txt.style.width = w+"px"
            f.style.width = w+"px"
        
            nxt.style.width = w+10+"px"
            nxt.style.height = (maxX+1)*30+50+"px"
        
            nxt.style.top = "calc(50% - "+((maxX+1)*30+50)/2+"px)"
        
            document.body.appendChild(nxt)

            updateAll()
            break
        }
    }
}
}




const int = window.setInterval(()=>{
    if (paused==false && current!=undefined) {
    switch (a==true) {
        case true: {
            switch (aC<maxD/4) {
                case false:{
                    aC = 0
                    switch (rayX(X,-1)!=1) {
                        case true:{
                            X--
                            break
                        }
                    }
                    updateAll()
                    break
                } case true: {
                    aC++
                    break
                }
            }
            break
        }
    }
    switch (d==true) {
        case true: {
            switch (dC<maxD/4) {
                case false:{
                    dC = 0
                    switch (rayX(X,1)!=1) {
                        case true:{
                            X++
                            break
                        }
                    }
                    updateAll()
                    break
                } case true: {
                    dC++
                    break
                }
            }
            break
        }
    }
    
    switch (descendTimer<maxD) {
        case true:{
            descendTimer++
            break
        } case false:{
            descendTimer = 0
            const r = rayY(Y,1)
            if (r==1) {
                switch(freezeTimer<4) {
                    case true:{
                        freezeTimer++
                        break
                    } case false:{
                        freezeTimer = 0
                        place()
                        break
                    }
                }
            } else {
                freezeTimer = 0
                Y++
            }
            updateAll()
            break
        }
    }
    updated = false
    }
},1000/60)