import { generateJSX as h1_generator } from "@/components/ui/draggables/Heading1";
import { generateJSX as p_generator } from "@/components/ui/draggables/Paragraph";

export function getGenerator(id: string) {
    switch (id) {
        case "h1":
        return h1_generator;
        case "p":
        return p_generator;
        default:
        return () => <div>Unknown block</div>;
    }
}