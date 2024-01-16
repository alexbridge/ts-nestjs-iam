import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsNotBlank(property?: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    const notBlank = (val) => typeof val === 'string' && val.trim().length > 0;
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (Array.isArray(value)) {
            return value.every(notBlank);
          }
          return notBlank(value);
        },
      },
    });
  };
}

export function IsInFuture(property?: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isInFuture',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return Date.now() < value.getTime();
        },
      },
    });
  };
}

export function IsAfter(property?: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsAfter',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate: (value: Date, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ] as Date;
          return relatedValue.getTime() < value.getTime();
        },
      },
    });
  };
}
