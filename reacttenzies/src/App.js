import React from 'react'
import Die from './components/Die'

export default function App() {

    const [numbers, setNumbers] = React.useState(allNewDice())

    function allNewDice() {
        const array = Array.from(Array(10), () => Math.floor(Math.random() * 6))

        return array.map(
            (x, i) => ({ value: x, isHeld: false, id: i })
        )
    }

    const dies = numbers.map((x) => {
        return <Die value={x.value} key={x.id} />
    })

    function rollDice() {
        setNumbers(allNewDice())
    }

    return (
        <main>
            <div className='innerDiv'>
                <div className='dieContainer'>
                    {dies}
                </div>
                <div>
                    <button className="rollButton" onClick={rollDice}>Roll</button>
                </div>
            </div>

        </main>
    )
}