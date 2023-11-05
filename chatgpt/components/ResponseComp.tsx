interface ModalProps {
    item: string;
    index: number;
}

const ResponseComp: React.FC<ModalProps> = ({ item, index }) => {
    return (
        <div
            className={`${index % 2 === 0 ? 'bg-blue-500' : 'bg-gray-300'
                } p-3 rounded-lg mb-4`}
        >
            <p className={`${index % 2 === 0 ? 'text-white' : 'text-black'
                }`}>{item}</p>
        </div>
    )
}
export default ResponseComp