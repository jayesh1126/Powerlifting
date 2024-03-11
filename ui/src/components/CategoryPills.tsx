import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./YoutubeButton";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

export function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillsProps){

    const [isLeftVisible, setIsLeftVisible] = useState(true)
    const [isRightVisible, setIsRightvisible] = useState(true)
    const [translate, setTranslate] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current == null) return
        // Whenever the size of the container changes, the code will be ran (anytime we click the buttons)
        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target
            if (container == null) return

            setIsLeftVisible(translate>0)
            setIsRightvisible(translate + container.clientWidth < container.scrollWidth)
        })

        observer.observe(containerRef.current)
    }, [categories, translate])

    return ( 
    
    <div ref={containerRef} className="overflow-x-hidden relative">
        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" 
        style={{ transform: `translateX(-${translate}px)`}}>
            {categories.map(category =>(
            <Button 
            key={category}
            onClick={() => onSelect(category)}
            variant= {selectedCategory===category ?
            "dark": "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap">
                {category}
            </Button>
            ))}
        </div>
        {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50%
        to-transparent w-24 h-full">
            <Button 
            variant="ghost" 
            size="icon" 
            className="h-full aspect-square w-auto p-1.5" 
            onClick={() => {
                setTranslate(translate =>{
                    const newTranslate = translate - TRANSLATE_AMOUNT
                    if (newTranslate <= 0) return 0
                    return newTranslate
                })
            }}
            >
                <ChevronLeft/>
            </Button>
            
        </div>
        )}
        {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50%
        to-transparent w-24 h-full flex justify-end">
            <Button 
            variant="ghost" 
            size="icon" 
            className="h-full aspect-square w-auto p-1.5"
            onClick={() =>{
                setTranslate(translate => {
                    // Check containRef exists
                if (containerRef.current == null) {
                    return translate
                }
                const newTranslate = translate + TRANSLATE_AMOUNT
                // Scroll width, how wide it is from the left to right hand side
                const edge = containerRef.current.scrollWidth
                // Just getting the visible width
                const width = containerRef.current.clientWidth
                    if (newTranslate + width >= edge) {
                        // Makes sure I am always on the edge of the container
                        return edge - width
                    }
                    return newTranslate
                }) 
            }} >
                <ChevronRight/>
            </Button>
            
        </div>
        )}
    </div>
    )
}