import { Picker } from "@react-native-picker/picker";

interface SortProductsOptionsProps {
    onChange: (sortBy: string) => void;
    value: string;
}

export const SortProductsOptions = ({onChange, value} : SortProductsOptionsProps) => {
    const filterOptions = [
        { label: '', sortQuery: '' },
        { label: 'Lower price', sortQuery: '?sortBy=price&order=asc' },
        { label: 'Higher price', sortQuery: '?sortBy=price&order=desc' },
        { label: 'Lower rating', sortQuery: '?sortBy=rating&order=asc' },
        { label: 'Higher rating', sortQuery: '?sortBy=rating&orer=desc' },
    ];
    
    const hasValue = filterOptions.some((i) => i.sortQuery === value);

    return(
        <Picker
            onValueChange={(v: string) => {
                if (v) {
                    onChange(String(v));
                } else onChange(String(''));
            }}
            selectedValue={hasValue ? value : ''}
        >
            {filterOptions.map(({ label, sortQuery}) => (
                <Picker.Item 
                    key={label} 
                    label={label} 
                    value={sortQuery} 
                />
            ))}
        </Picker>
    )
}