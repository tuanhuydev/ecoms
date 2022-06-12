<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class SeverityType extends Enum
{
  const LOW = 'LOW';
  const MEDIUM = 'MEDIUM';
  const HIGH = 'HIGH';
  const CRITICAL = 'CRITICAL';
}
