import { HelpCircle } from 'lucide-react'

const Hint = ({ title }) => {
    return (
        <span className="group relative mt-1 inline-flex items-center">
            <HelpCircle className="h-4 w-4 font-light text-gray-400 transition-all duration-300 hover:text-black" />
            <span className="tooltip">{title}</span>
        </span>
    )
}

export default Hint
