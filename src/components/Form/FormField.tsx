import { min } from "date-fns";

type FormFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  title: string;
  type: string;
  name: string;
  required: boolean;
  min?: string;
  placeholder?: string;
};

export default function FormField({
  onChange,
  value,
  title,
  type,
  name,
  required,
  min,
  placeholder
}: FormFieldProps) {


    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {title}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={required}
                placeholder={placeholder}
                {...(type === 'number' ? { min } : {})}
            />
        </div>
    );
}