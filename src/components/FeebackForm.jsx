import { useState } from 'react'

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!feedback.trim()) return
        console.log('Feedback:', feedback)
        setSubmitted(true)
    }

    return (
        <div className="max-w-sm mx-auto  bg-white">
            {submitted ? (
                <p className="text-green-600 text-center font-medium">Obrigado pelo feedback! 🎉</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-1">
                    <textarea
                        className="w-full p-2 h-24 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        placeholder="Menssagem de feeback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm hover:bg-orange-700 transition"
                    >
                        Enviar
                    </button>
                </form>
            )}
        </div>
    )
}
