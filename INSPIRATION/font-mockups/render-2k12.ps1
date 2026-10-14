Add-Type -AssemblyName System.Drawing
$fontCollection = New-Object System.Drawing.Text.PrivateFontCollection
$fontCollection.AddFontFile((Join-Path $PSScriptRoot 'fonts/the_2k12/The 2K12.ttf'))
$bitmap = New-Object System.Drawing.Bitmap(1460,225)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$fontSize = 210
do {
 $font = New-Object System.Drawing.Font($fontCollection.Families[0], $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
 $size = $graphics.MeasureString('VIKTOR KVIST', $font, 3000, [System.Drawing.StringFormat]::GenericTypographic)
 if ($size.Width -gt 1450 -or $size.Height -gt 220) { $font.Dispose(); $fontSize -= 2 }
} while ($size.Width -gt 1450 -or $size.Height -gt 220)
$graphics.DrawString('VIKTOR KVIST', $font, [System.Drawing.Brushes]::Black, 0, ((225 - $size.Height) / 2), [System.Drawing.StringFormat]::GenericTypographic)
$bitmap.Save((Join-Path $PSScriptRoot 'the-2k12-title.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$font.Dispose(); $graphics.Dispose(); $bitmap.Dispose(); $fontCollection.Dispose()
