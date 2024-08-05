$(document).ready(function () {
    // Cargar la lista de países
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        method: 'GET',
        success: function (data) {
            let opciones = '<option value="">Seleccione un país</option>';
            data.forEach(pais => {
                opciones += `<option value="${pais.name.common}">${pais.name.common}</option>`;
            });
            $('#pais').html(opciones);
        }
    });

    // Consultar nombre de GitHub
    $('#usuario-github').on('blur', function () {
        const username = $(this).val();
        if (username) {
            $.ajax({
                url: `https://api.github.com/users/${username}`,
                method: 'GET',
                success: function (data) {
                    $('#nombre-github').text(data.name ? data.name : 'Nombre no disponible');
                },
                error: function () {
                    $('#nombre-github').text('Usuario no encontrado');
                }
            });
        }
    });

    // Consultar código de país
    $('#pais').on('change', function () {
        const pais = $(this).val();
        if (pais) {
            $.ajax({
                url: `https://restcountries.com/v3.1/name/${pais}`,
                method: 'GET',
                success: function (data) {
                    const codigo = data[0].idd.root + (data[0].idd.suffixes ? data[0].idd.suffixes[0] : '');
                    $('#codigo-pais').text(`Código del país: ${codigo}`);
                }
            });
        }
    });

    // Enviar datos al servidor
    $('#formulario-usuario').on('submit', function (e) {
        e.preventDefault();

        const nombreGithub = $('#nombre-github').text();
        const telefono = $('#telefono').val();
        const correo = $('#correo').val();

        if (nombreGithub && telefono && correo) {
            $.ajax({
                url: 'guardar_usuario.php',
                method: 'POST',
                data: {
                    nombreGithub: nombreGithub,
                    telefono: telefono,
                    correo: correo
                },
                success: function (response) {
                    if (response.error) {
                        console.error(response.error);
                    } else {
                        $('#usuarios-registrados').append(`
                            <tr>
                                <td>${response.nombreGithub}</td>
                                <td>${response.telefono}</td>
                                <td>${response.correo}</td>
                            </tr>
                        `);
                        $('#formulario-usuario')[0].reset();
                        $('#nombre-github').text('');
                        $('#codigo-pais').text('');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error en la solicitud: ', error);
                }
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});
