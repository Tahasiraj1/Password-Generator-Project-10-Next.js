"use client";

import { useState, ChangeEvent } from 'react';
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function GeneratePassword() {
    const [length, setLength] = useState<number>(16);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLength(Number(e.target.value));
    };

    const handleCheckedboxChange = 
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
        if (typeof checked === "boolean") {
            setter(checked);
        }
    };

    const generatePassword = (): void => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

        let allChars = "";
        if (includeUppercase) allChars += uppercaseChars;
        if (includeLowercase) allChars += lowercaseChars;
        if (includeNumbers) allChars += numberChars;
        if (includeSymbols) allChars += symbolChars;
        if (allChars === "") {
            alert("Please select at least one character type.");
            return;
        }
        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            generatedPassword += allChars[randomIndex];
        }
        setPassword(generatedPassword)
    }

    const copyToClipboard = (): void => {
        navigator.clipboard.writeText(password).then(
            (success) => {
                alert("password copied to clipboard!");
            },
            (error) => {
                alert("Failed to copy password to clipboard.")
            }
        );
    };
    

    const resetPassword = (): void => {
        const confirmation = confirm("Are you sure, you want to reset your password?");
        if (confirmation) {
            setLength(16);
            setIncludeUppercase(true);
            setIncludeLowercase(false);
            setIncludeNumbers(false);
            setIncludeSymbols(false);
            setPassword("");
            alert("Password has been reset!");
        } else {
            alert("Password reset canceled.")
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'
        style={{
            backgroundImage: `url('/pass4.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
            <Card className='border-gray-900 border-2 w-full max-w-md p-6 rounded-3xl shadow-2xl bg-gradient-to-r from-green-600 via-green-400 to-green-600'>
                <div className='mx-auto max-w-md space-y-6'>
                    <div className='space-y-2 text-center'>
                        <h1 className='font-bold text-3xl'>Password Generator</h1>
                        <p className='font-bold'>
                            Create a secure password with just a few clicks.
                        </p>
                    </div>
                    <div className='font-bold space-y-2'>
                        <label htmlFor='lenght'>Password Length</label>
                        <Input
                        id='lenght'
                        type='number'
                        min="8"
                        max="32"
                        value={length}
                        onChange={handleLengthChange}
                        className='w-full rounded-2xl border-2 border-gray-700'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label className='font-bold'>Inlude:</Label>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                            className='rounded-3xl'
                            id='uppercase'
                            checked={includeUppercase}
                            onCheckedChange={handleCheckedboxChange(setIncludeUppercase)}
                            />
                            <Label className='font-bold' htmlFor='uppercase'>Uppercase Letters</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                            className='rounded-3xl'
                            id='lowercase'
                            checked={includeLowercase}
                            onCheckedChange={handleCheckedboxChange(setIncludeLowercase)}
                            />
                            <Label className='font-bold' htmlFor='lowercase'>Lowercase Letters</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                            className='rounded-3xl'
                            id='numbers'
                            checked={includeNumbers}
                            onCheckedChange={handleCheckedboxChange(setIncludeNumbers)}
                            />
                            <Label className='font-bold' htmlFor='numbers'>Numbers</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                            className='rounded-3xl'
                            id='symbols'
                            checked={includeSymbols}
                            onCheckedChange={handleCheckedboxChange(setIncludeSymbols)}
                            />
                            <Label className='font-bold' htmlFor='symbols'>Symbols</Label>
                        </div>
                    </div>
                    <Button
                    type='button'
                    className='w-full rounded-3xl active:scale-95 transition-transform duration-100'
                    onClick={generatePassword}
                    >
                        Generate Password
                    </Button>
                    <div className='relative space-y-2'>
                        <Label className='font-bold' htmlFor='password'>
                            Generated Password:
                        </Label>
                        <Input
                        id='password'
                        type='text'
                        value={password}
                        readOnly
                        className='flex rounded-2xl border-2 border-gray-700'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button
                        type='button'
                        onClick={copyToClipboard}
                        className='rounded-3xl w-40 active:scale-95 transition-transform duration-100'
                        >
                            Copy to Clipboard
                        </Button>
                        <Button
                        type='button'
                        onClick={resetPassword}
                        className='rounded-3xl w-40 bg-red-800 hover:bg-red-600 active:scale-95 transition-transform duration-100'
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}