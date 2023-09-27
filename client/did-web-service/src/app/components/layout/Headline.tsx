import { FC, ReactNode } from "react";

const Headline: FC<{ title: string, description: string | ReactNode }> = ({ title, description }) => (
    <>
        <h3 className='w-full text-4xl font-bold'>
            {title}
        </h3>
        <p className="mt-4">
            {description}
        </p>
    </>
)
export default Headline