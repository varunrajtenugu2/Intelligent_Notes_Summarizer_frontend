"use client";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const calculateStrength = (pwd: string): { level: number; text: string; color: string } => {
    if (!pwd) return { level: 0, text: "", color: "" };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/(?=.*[a-z])/.test(pwd)) strength++;
    if (/(?=.*[A-Z])/.test(pwd)) strength++;
    if (/(?=.*\d)/.test(pwd)) strength++;
    if (/(?=.*[@$!%*?&])/.test(pwd)) strength++;

    if (strength <= 2) return { level: 1, text: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { level: 2, text: "Fair", color: "bg-yellow-500" };
    return { level: 3, text: "Strong", color: "bg-green-500" };
  };

  const { level, text, color } = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded ${
              i <= level ? color : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600">
        Password strength: <span className="font-semibold">{text}</span>
      </p>
    </div>
  );
}
