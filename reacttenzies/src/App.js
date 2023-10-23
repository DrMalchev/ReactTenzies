import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

export default function App() {

    const [numbers, setNumbers] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    //console.log(numbers)
    function allNewDice() {
        const array = Array.from(Array(10), () => Math.floor(Math.random() * 6))

        return array.map(
            (x, i) => ({ value: x, isHeld: false, id: i })
        )
    }

    function handleClick(id) {
        const updatedNumbers = Array(0)
        numbers.forEach(element => {
            if (element.id === id) {
                updatedNumbers.push({ ...element, isHeld: !element.isHeld })
            }
            else {
                updatedNumbers.push(element)
            }

        });
        //console.log(updatedNumbers)
        setNumbers(updatedNumbers)

    }

    const dies = numbers.map((x) => {
        return <Die isHeld={x.isHeld} value={x.value} key={x.id} handleClick={() => handleClick(x.id)} />
    })

    function initialize() {
        //debugger;
        setTenzies(false)
        setNumbers(allNewDice())

    }
    function rollDice() {
        const heldNumbers = Array(0)
        var counter = 0;
        numbers.forEach((element, i) => {
            if (element.isHeld === true) {
                counter = counter + 1;
                heldNumbers.push({ ...element, id: counter })
            }
            else {
                counter = counter + 1;
                heldNumbers.push({
                    value: Math.floor(Math.random() * 6),
                    isHeld: false,
                    id: counter
                })
            }
        });
        //console.log(heldNumbers)
        setNumbers(heldNumbers)
    }

    React.useEffect(() => {
        var held = numbers.every(x => x.isHeld === true)
        var equal = numbers.reduce((a, b) => a + b.value, 0) % 10 === 0

        if (held && equal) {
            console.log('Won!')
            setTenzies(true)
        }

    }, [numbers])

    return (
        <main>
            <div className='innerDiv'>
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='dieContainer'>
                    {dies}
                </div>
                <div>
                    <button className="rollButton" onClick={!tenzies ? rollDice : initialize}>{tenzies ? 'New Game' : 'Roll'}</button>
                </div>
            </div>

        </main>
    )
}