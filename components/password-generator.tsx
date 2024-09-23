"use client";

import { useState, ChangeEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function GeneratePassword() {
    const [length, setLength] = useState<number>(16);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = (): void => {
        setPasswordVisible(!passwordVisible);
    };
    
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

        if (length < 8 || length > 32) {
            alert("Password length must be between 8 and 32 characters.");
            return;
        }

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
        setPassword(generatedPassword);
    }

    const copyToClipboard = (): void => {
        navigator.clipboard.writeText(password).then(
            () => {
                alert("Password copied to clipboard!");
            },
            () => {
                alert("Failed to copy password to clipboard.");
            }
        );
    };

    const resetPassword = (): void => {
        const confirmation = confirm("Are you sure you want to reset your password?");
        if (confirmation) {
            setPassword("");
            alert("Password has been reset!");
        } else {
            alert("Password reset canceled.");
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
            <Card className='border-gray-900 border-2 w-full max-w-md p-6 rounded-3xl shadow-2xl bg-gradient-to-r from-green-400 via-green-300 to-green-400'>
                <div className='mx-auto max-w-md space-y-6'>
                    <div className='space-y-2 text-center'>
                        <h1 className='font-bold text-3xl'>Password Generator</h1>
                        <p className='font-bold'>
                            Create a secure password with just a few clicks.
                        </p>
                    </div>
                    <div className='font-bold space-y-2'>
                        <label htmlFor='length'>Password Length</label>
                        <Input
                        id='length'
                        type='number'
                        value={length}
                        onChange={handleLengthChange}
                        className='w-full rounded-2xl border-2 border-gray-700'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label className='font-bold'>Include:</Label>
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
                    className='w-full rounded-3xl active:bg-gray-900 active:scale-95 transition-transform duration-100'
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
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        readOnly
                        className='flex rounded-3xl border-2 border-gray-700'
                        />
                        <Button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='bg-green hover:bg-green absolute right-2 top-1/2 transform -translate-y-1/4 size-15 active:scale-50 transition-transform duration-100'
                            aria-label="Toggle Password Visibility"
                        >
                            {passwordVisible ? <FaEyeSlash className='text-black' /> : <FaEye className='text-black' />}
                        </Button>
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
                            Reset Password
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
